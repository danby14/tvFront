import React from 'react';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const ShareLeageInfo = ({ shareUrl, shortTitle, longTitle, body }) => {
  return (
    <>
      <EmailShareButton
        url={shareUrl}
        subject={shortTitle}
        body={body}
        openShareDialogOnClick={true}
        onClick={e => e.preventDefault()}
      >
        <EmailIcon size={32} round />
      </EmailShareButton>{' '}
      <TwitterShareButton url={shareUrl} title={longTitle}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>{' '}
      <FacebookShareButton url={shareUrl} quote={longTitle}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </>
  );
};

export default ShareLeageInfo;
