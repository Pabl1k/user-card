import clsx from 'clsx';
import { ChangeEvent, FC, useState } from 'react';
import { isFileExtensionAccepted } from '../../common/utils';
import './Uploader.sass';

interface Props {
  uploadedFileName?: string;
  onUpload: (file: File) => void;
}

const MAX_SIZE = 5_242_880; // 5 MB

type ErrorKey = 'fileExt' | 'fileMinSize' | 'fileMaxSize' | 'fileLoadFail' | 'uploadFail';

const errorMapper: Record<ErrorKey, string> = {
  fileExt: 'The photo format must be jpeg/jpg type',
  fileMinSize: 'The photo size must be greater than 70x70 px',
  fileMaxSize: 'File size must not be greater than 5 Mb',
  fileLoadFail: 'Failed to load image',
  uploadFail: 'Failed to upload file'
};

const Uploader: FC<Props> = ({ uploadedFileName, onUpload }) => {
  const [failedFileName, setFailedFileName] = useState('');
  const [errorKey, setErrorKey] = useState<ErrorKey | ''>('');

  const displayFileName = failedFileName || uploadedFileName;

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setErrorKey('');
    setFailedFileName('');

    if (!file) {
      setErrorKey('uploadFail');
      return;
    }

    if (!isFileExtensionAccepted(file?.name)) {
      setErrorKey('fileExt');
      setFailedFileName(file.name);
      return;
    }

    if (file && file.size >= MAX_SIZE) {
      setErrorKey('fileMaxSize');
      setFailedFileName(file.name);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      console.log('Image dimensions:', img.width, img.height);
      if (img.width < 70 || img.height < 70) {
        setErrorKey('fileMinSize');
        URL.revokeObjectURL(objectUrl);
        return;
      }

      onUpload(file);
      URL.revokeObjectURL(objectUrl);
    };

    img.onerror = () => {
      setErrorKey('fileLoadFail');
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  return (
    <>
      <div className={clsx('uploader', errorKey && 'uploader--error')}>
        <label htmlFor="file-upload" className="uploader__button">
          Upload
          <input id="file-upload" type="file" onChange={handleUpload} />
        </label>
        <div className="uploader__text">{displayFileName || 'Upload your photo'}</div>
      </div>
      {errorKey && <span className="uploader__error-text">{errorMapper[errorKey]}</span>}
    </>
  );
};

export default Uploader;
