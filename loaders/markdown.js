const MarkdownIt = require('markdown-it')
const Container = require('markdown-it-container')
const hljs = require('highlight.js');
const fs = require('fs')
const path = require('path')


const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {
            }
        }
        return ''; // 使用额外的默认转义
    }
});

md.use(Container, 'tip', {
    validate(params) {
        const arr = ['primary', 'warning', 'danger', 'success']
        return arr.includes(params.trim())
    },
    render(tokens, index) {
        const token = tokens[index]
        if (token.nesting === 1) {
            return `<div class="markdown-tip ${token.info.trim()}">\n`
        } else return `</div>`
    }
})


module.exports = function (content, map, meta) {
    const {context} = this

    let idx = 0
    const buildComponentName = () => {
        return 'comp' + idx++
    }

    const t = content.split('\r\n')
    const components = []
    const results = []
    for (let i = 0; i < t.length; i++) {
        const current = t[i]
        const s = current.match(/^@Component\s*\((.+)\)\s*$/)
        if (!s) {
            results.push(current)
            continue
        }
        const node = {
            sourceCode: current ,
            target: path.resolve(context, s[1].replace(/["']/g, '')),
            name: buildComponentName()
        }
        node.templateCode = fs.readFileSync(node.target, 'utf-8')
        components.push(node)
        results.push("< " + node.name + " />")
        results.push("```html\r\n" + node.templateCode + "\r\n```")
    }

    const str = results.join('\r\n')

    const htmlCode = md.render(str)

    const code = `
        <template>
        ${htmlCode}
        </template>
        <script>
            export default  {
                components : {
                    ${components.map(c => c.name + ': 111').join(',')}
                }
            }
        </script>
    `
    return code
};
