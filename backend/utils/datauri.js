import DataUriParser from "datauri/parser.js"
import path from "path"

const parser = new DataUriParser()

export const getDataUri = (file) => {
    const extName = path.extname(file.originalName).toString()
    return parser.format(extName, file.buffer).content
}
