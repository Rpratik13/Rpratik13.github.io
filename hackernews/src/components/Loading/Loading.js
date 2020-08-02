import React from 'react';

function Loading (props){ 
  let clsName = props.pad ? "loading-pad" : "";
  let width   = props.width;

  return (<div className = {clsName}>
            <svg height = "20" width = {width}>
              <path d = {"M0,0 h" + width + "v20 h-" + width}>
                <animate
                  attributeName = "fill"
                  dur           = "0.8s"
                  repeatCount   = "indefinite"
                  values        = "#987;#fff;#987;#987"
                />
              </path>
            </svg>
          </div>
          )
}

export default Loading;