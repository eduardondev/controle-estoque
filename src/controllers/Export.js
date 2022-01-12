import json2xlsx from 'node-json-xlsx'
import { Logger } from '~/utils/log'
import fs from 'fs'

export const _postExport = async () => {
  try {
    const xlsx = json2xlsx(json)

    fs.writeFileSync('data.xlsx', xlsx, 'binary')
  } catch (err) {
    Logger.error(err)
  }
}
