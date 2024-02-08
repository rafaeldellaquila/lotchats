import menu from './menus.json'
import status from './status.json'

const mergeJson = (...jsons: { [key: string]: string }[]) => {
  return Object.assign({}, ...jsons)
}

const mergeds = mergeJson(menu, status)

export default mergeds
