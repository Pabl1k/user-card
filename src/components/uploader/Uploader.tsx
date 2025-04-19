import clsx from 'clsx';
import { ChangeEvent, FC, useState } from 'react';
import { isFileExtensionAccepted } from '../../common/utils';
import './Uploader.sass';

interface Props {
  onUpload: (file: File) => void;
}

const MAX_SIZE = 5_242_880; // 5 MB

type ErrorKey = 'fileExt' | 'fileSize' | 'uploadFail';

const errorMapper: Record<ErrorKey, string> = {
  fileExt: 'The photo format must be jpeg/jpg type',
  fileSize: 'File size must not be greater than 5 Mb',
  uploadFail: 'Failed to upload file'
};

const Uploader: FC<Props> = ({ onUpload }) => {
  const [fileName, setFileName] = useState<string>('');
  const [errorKey, setErrorKey] = useState<ErrorKey | ''>('');

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file?.name || '');
    setErrorKey('');

    if (!file) {
      setErrorKey('uploadFail');
      return;
    }

    if (!isFileExtensionAccepted(file?.name)) {
      setErrorKey('fileExt');
      return;
    }

    if (file && file.size >= MAX_SIZE) {
      setErrorKey('fileSize');
      return;
    }

    onUpload(file);
    setFileName('');
  };

  return (
    <>
      <div className={clsx('uploader', errorKey && 'uploader--error')}>
        <label htmlFor="file-upload" className="uploader__button">
          Upload
          <input id="file-upload" type="file" onChange={handleUpload} />
        </label>
        <div className="uploader__text">{fileName || 'Upload your photo'}</div>
      </div>
      {errorKey && <span className="uploader__error-text">{errorMapper[errorKey]}</span>}
    </>
  );
};

export default Uploader;
