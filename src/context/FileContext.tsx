import React from "react";


interface FileContextType {
    files: File[];
}

const FileContext = React.createContext<FileContextType | undefined>(undefined);


export const FileProvider: React.FC = ({ children }) => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
        <FileContext.Provider value={{ files }}>
            {children}
        </FileContext.Provider>
    );
};

export default FileContext;
