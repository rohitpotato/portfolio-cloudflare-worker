import { CURRENT } from '../constants'
import { configRequestBody, updateConfigResponse } from '../types'

export const getVersion = async (version = CURRENT): Promise<any> => {
  let config
  if (version === CURRENT) {
    config = (await SITE_CONFIG.get(CURRENT)) || ''
    return config
  }
  config = (await SITE_CONFIG.get(version)) || ''
  return config
}

export const updateVersion = async (
  configData: configRequestBody,
): Promise<updateConfigResponse> => {
  try {
    const latestVersion = await getVersion(CURRENT)
    const versionKey =
      (latestVersion && JSON.parse(latestVersion)?.version) || null
    if (!versionKey) {
      configData.version = 1
      await SITE_CONFIG.put('1', JSON.stringify(configData))
    } else {
      const nextVersion = Number(versionKey) + 1
      configData.version = nextVersion
      await SITE_CONFIG.put(String(nextVersion), JSON.stringify(configData))
    }
    await SITE_CONFIG.put(CURRENT, JSON.stringify(configData))
    return {
      success: true,
    }
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'There was an error updating the configuration.',
    }
  }
}
