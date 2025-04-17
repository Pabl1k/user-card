import clsx from 'clsx';
import './Uploader.sass';

const Uploader = () => {
  const error = false;

  return (
    <>
      <div className={clsx('uploader', error && 'uploader--error')}>
        <label htmlFor="file-upload" className="uploader__button">
          Upload
          <input id="file-upload" type="file" />
        </label>
        <div className="uploader__text">Upload your photo</div>
      </div>
      {error && <span className="uploader__error-text">error message</span>}
    </>
  );
};

export default Uploader;
