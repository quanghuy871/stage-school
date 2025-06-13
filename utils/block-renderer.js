/* eslint-disable react/jsx-props-no-spreading, react/prop-types, import/no-cycle */
"use client"
import React from 'react';
import LandingBanner from '@/components/blocks/landing-banner';
import EmptyBlock from '@/components/blocks/empty-block';
import TitleContentButton from '@/components/blocks/title-content-button';
import TitleListButton from '@/components/blocks/title-list-button';
import TitleFourColumn from '@/components/blocks/title-four-columns';
import Cta from '@/components/blocks/cta';
import TitleContentButtonImage from '@/components/blocks/title-content-button-image';
import TitleAnimation from '@/components/blocks/title-animation';
import DoubleImage from '@/components/blocks/double-image';

export const BlockRendererContext = React.createContext(-1);

export const RenderBlock = ({ _type, ...props }) => {
  switch (_type) {
    case "landingBanner":
      return <LandingBanner {...props} />;
    case "titleContentButton":
      return <TitleContentButton {...props} />;
    case "titleListButton":
      return <TitleListButton {...props} />;
    case "titleFourColumn":
      return <TitleFourColumn {...props} />;
    case "titleAnimation":
      return <TitleAnimation {...props} />;
    case "cta":
      return <Cta {...props} />;
    case "titleContentButtonImage":
      return <TitleContentButtonImage {...props} />;
    case 'titleAnimation':
      return <TitleAnimation {...props} />;
    case 'doubleImage':
      return <DoubleImage {...props} />;
    default:
      return <EmptyBlock>{_type}</EmptyBlock>;
  }
};

const BlockRenderer = ({ data }) => {
  const existingRenderContextDepth = React.useContext(BlockRendererContext);

  return (
    <BlockRendererContext.Provider value={existingRenderContextDepth + 1}>
      {data &&
        data.map((block, i) => {
          const { _type: blockType } = block;

          if (!blockType) {
            throw new Error("source _type missing!");
          }

          return (
            <React.Fragment key={i}>
              <RenderBlock _type={blockType} {...block} />
            </React.Fragment>
          );
        })}
    </BlockRendererContext.Provider>
  );
};

export default BlockRenderer;
