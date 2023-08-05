import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { Card, Image, Text, Input, Display, Spacer } from '@geist-ui/core'
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

export const InscriptionDetail = () => {
  //12321607
  const fetchInscription = async (number = 0) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}number=${number}`);
    const data = await response.json();
    setInsc(data);
  };
  const s = `<svg
  xmlns="http://www.w3.org/2000/svg"
  style="background-color: rgb(139, 201, 255);"
  data-clct="doodinals"
  version="1.1"
  width="100%"
  height="100%"
  viewBox="0 0 600 600"
  preserveAspectRatio="xMidYMid meet"
>
  <g transform=" translate(177.00000000000003,94.99999999999997)">
    <image
      width="291"
      height="391"
      href="https://ordinals.com/content/6b4ff996190d799f46feee49bfbd6971e9382808be98f40ec6e73eb92bbd83aai0"
      style="image-rendering: pixelated;"
    />
  </g>
</svg>`;
  const [insc, setInsc] = useState({});
  useEffect(() => {
    fetchInscription();
  }, [])

  return (
    <div className="inscription-detail">
      <header className="App-header">
        <Input placeholder="Search" initialValue="" width="400px"
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              fetchInscription(e.target.value);
            }
          }}
        />
        <Spacer y={1} />
        <img src={s} alt="" />
        {
          insc?.data?.content_type.startsWith("image/") ?
            <Card shadow width="400px">
              <Display shadow>
                <Image
                  src={insc?.data?.content_type !== "image/svg+xml" ? `data:${insc?.data?.content_type};base64, ${insc?.data?.content}` : insc?.data?.content}
                  width="280px"
                  height="280px"
                />
                {/* <Image src={s} width="280px" height="280px" />
                <div dangerouslySetInnerHTML={{__html: s}}></div> */}
              </Display>
            </Card> :
            <p>{insc?.data?.content_type}</p>
        }
        {
          <Text>{insc?.data?.content_type}</Text>
        }
      </header>
      <div>

      </div>
    </div>
  );
}

export default () => (
  <GeistProvider>
    <CssBaseline />
    <InscriptionDetail />
  </GeistProvider>
);
