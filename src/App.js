import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { Card, Image, Text, Input, Display, Spacer, Code } from '@geist-ui/core'
import './App.css';
import { useEffect, useState } from 'react';

const isNumeric = (str) => {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export const InscriptionDetail = () => {

  const [insc, setInsc] = useState({});

  const fetchInscription = async (number) => {
    if(isNumeric(number)) {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}number=${number}`);
      const data = await response.json();
      setInsc(data);
    }
    else {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}id=${number}`);
      const data = await response.json();
      setInsc(data);
    }
    
  };

  useEffect(() => {
    fetchInscription("0");
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
        {
          insc?.data?.content_type.startsWith("image/") ?
            <Card hoverable shadow width="400px" height="400px">
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
            <Card hoverable shadow width="400px" height="400px">
              <Display shadow>
                {insc?.data?.content}
              </Display>
            </Card>
        }
        <Spacer y={1.5} />
        <Text type="secondary" small>{insc?.data?.content_type}</Text>
        <Text>{insc?.data?.inscription_id}</Text>
        <Text>{insc?.data?.address}</Text>
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
