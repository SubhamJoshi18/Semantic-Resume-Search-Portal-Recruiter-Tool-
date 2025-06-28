import { IAPIResposne } from "../interface/api.interface";
import { IFileContent } from "../interface/file.interface";

class FileService {
  public async uploadFileProcess(
    fileContent: Required<IFileContent>
  ): Promise<Required<IAPIResposne>> {
    return {
      data: "",
      message: "",
    };
  }
}

const getFileInstance = (): FileService => {
  return new FileService();
};

export default getFileInstance;
