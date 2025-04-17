import clsx from 'clsx';
import { ChangeEvent, FC, useState } from 'react';
import { isFileExtensionAccepted } from '../../common/utils';
import './Uploader.sass';

interface Props {
  onUpload: (file: File) => void;
}

const MAX_SIZE = 5_242_880; // 5 MB

const errorMapper = {
  fileExt: 'The photo format must be jpeg/jpg type',
  fileSize: 'File size must not be greater than 5 Mb',
  uploadFail: 'Failed to upload file'
};

const Uploader: FC<Props> = ({ onUpload }) => {
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState('');

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file?.name || '');
    setError('');

    if (!file) {
      setError(errorMapper.uploadFail);
      return;
    }

    if (!isFileExtensionAccepted(file?.name)) {
      setError(errorMapper.fileExt);
      return;
    }

    if (file && file.size >= MAX_SIZE) {
      setError(errorMapper.fileSize);
      return;
    }

    onUpload(file);
  };

  return (
    <>
      <div className={clsx('uploader', error && 'uploader--error')}>
        <label htmlFor="file-upload" className="uploader__button">
          Upload
          <input id="file-upload" type="file" onChange={handleUpload} />
        </label>
        <div className="uploader__text">{fileName || 'Upload your photo'}</div>
      </div>
      {error && <span className="uploader__error-text">{error}</span>}
    </>
  );
};

export default Uploader;
