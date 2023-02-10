import Netflix from './dom/providers/Netflix'
import Disney from './dom/providers/Disney'
import { ProviderUrlDomain } from './enum/ProviderUrlDomain'
import { LogSeverityId } from './enum/LogSeverity'
import Logger from './logging/Logger'

const netflix = new Netflix()
const disney = new Disney()
const domain = window.location.hostname

setInterval(() => {
  if (domain) {
    switch (domain) {
      case ProviderUrlDomain.DISNEY:
        disney.refreshRatings()
        break
      default:
        netflix.refreshRatings()
        break
    }
  }
}, 1000)

chrome.runtime.onMessage.addListener((event) => {
  const logger = new Logger()
  const { context, message, severity } = event
  switch (severity) {
    case LogSeverityId.ERROR:
      logger.error(message, {
        ...context,
        name: context.platformProduct.title,
        provider: context.platformProduct.providers[0]
      })
      break
    case LogSeverityId.DEBUG:
      logger.debug(message, {
        ...context,
        name: context.platformProduct.title,
        provider: context.platformProduct.providers[0]
      })
      break
    default:
      logger.info(message, {
        ...context,
        name: context.platformProduct.title,
        provider: context.platformProduct.providers[0]
      })
  }
})
