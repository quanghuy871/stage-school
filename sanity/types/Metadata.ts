export type ImageObject = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
};

export type Metadata = {
  fallbackTitle?: string;
  titleSuffix?: string;
  fallbackDescription?: string;
  noindex?: boolean;
  websiteName?: string;
  fallbackSocialImage?: ImageObject;
  fallbackPageAddress?: string;
  twitterAccount?: string;
  defaultTwitter?: string;
  image?: string;
};