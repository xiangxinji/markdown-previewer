const MarkdownIt = require('markdown-it')
const Container = require('markdown-it-container')
const hljs = require('highlight.js');
const fs = require('fs')
const path = require('path')

const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true,
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
    const links = []
    let idx = 0
    const buildComponentName = () => {
        return 'comp' + idx++
    }
    const t = content.split('\r\n')
    const components = []
    const results = []

    md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
        const title = (tokens[idx + 1].content || '').trim()
        const token = tokens[idx]
        const attrIndex = token.attrIndex('name')
        if (attrIndex < 0 && title) {
            token.attrPush(['name', title])
        } else token.attrs[attrIndex][1] = title
        // 传递 token 到默认的渲染器。
        links.push({title: title, tag: token.tag, level: parseInt(token.tag.substr(1))})
        return `<${token.tag}><a id="${title}"  href="#${title}">`
    }
    md.renderer.rules.heading_close = function (tokens, idx) {
        const token = tokens[idx]
        return `</a></${token.tag}>`
    }

    console.log(links)

    for (let i = 0; i < t.length; i++) {
        const current = t[i]
        const s = current.match(/^@Component\s*\((.+)\)\s*$/)
        if (!s) {
            results.push(current)
            continue
        }
        const modulePath = s[1].replace(/["']/g, '')
        const node = {
            sourceCode: current,
            target: path.resolve(context, s[1].replace(/["']/g, '')),
            name: buildComponentName(),
            modulePath
        }
        node.templateCode = fs.readFileSync(node.target, 'utf-8')
        components.push(node)
        results.push("<" + node.name + " />\r\n")
        results.push("```html\r\n" + node.templateCode + "\r\n```")
    }
    const str = results.join('\r\n')
    const htmlCode = md.render(str)
    const code = `
        <template>
        ${htmlCode}
        </template>
        <script>
            const links = ${JSON.stringify(links)}
            ${components.map(i => `import ${i.name} from './${i.modulePath}'`).join('\r\n')}
            export default  {
                components : {
                    ${components.map(c => c.name).join(',')}
                },
                mounted (){
                         console.log(links)
                }
            }
        </script>
    `
    return code
};
