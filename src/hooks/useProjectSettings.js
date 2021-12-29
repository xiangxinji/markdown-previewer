import settings from '../settings'

export function useProjectSettings() {

    const context = {
        rightNavs: settings.rightNavs,
        leftNavs : settings.leftNavs
    }

    return [settings, context]
}
