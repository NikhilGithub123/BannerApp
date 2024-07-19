import {TextField, RangeSlider} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { createOrUpdateBanner } from "../app.server"
import { authenticate } from "../shopify.server";
import {
  useSubmit,
} from "@remix-run/react";
import {
  PageActions,
  Page,
} from "@shopify/polaris";


export async function action({ request, params }) {
  console.log("inside action ", params);
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  const labelProductObjs = {
    ...Object.fromEntries(await request.formData()),
    shop,
  };

  console.log("object ", labelProductObjs)
  const arrayToIterate = [labelProductObjs];
  const result = createOrUpdateBanner(arrayToIterate);
  return result;
}

function TextFieldExample() {
  const [value, setValue] = useState('Demo Banner Of Blackbytt');

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const submit = useSubmit();
  function handleSave() {
    const data = {
      "bannerText": value,
      "topValue": topValue,
      "bottomValue": bottomValue,
      "leftValue": leftValue,
      "rightValue": rightValue,      
    };
    submit(data, { method: "post" });
  }

  const [topValue, setTopValue] = useState(0);
  const [bottomValue, setBottomValue] = useState(0);
  const [rightValue, setRightValue] = useState(0);
  const [leftValue, setLeftValue] = useState(0);

  const handleTopSliderChange = useCallback((value) => {
    setTopValue(value);
  }, []);  


  const handleBottomSliderChange = useCallback((value) => {
    setBottomValue(value);
  }, []);  


  const handleLeftSliderChange = useCallback((value) => {
    setLeftValue(value);
  }, []);  


  const handleRightSliderChange = useCallback((value) => {
    setRightValue(value);
  }, []);  

    // use default active index
    const [activeIndex, setActiveIndex] = useState(0);

    // function to handle position grid
    const handleItemClick = (index) => {
      setActiveIndex(index); // Set the clicked item as active'
  //    handlePositionChange(index + 1);
    };


  const positionClasses = [
    'top-left', 'top-right',
    'bottom-left', 'bottom-right'
  ];
  return (
    <Page>
    <TextField
      label="Store name"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
                  <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', justifyContent: 'center' }}>
                  {Array.from({ length: 4 }, (_, index) => (
                    <div
                      key={index}
                      style={{ border: `1px solid ${activeIndex === index ? 'var(--p-color-bg-fill-info-active)' : '#b0b0b0'}`, width: '100%', height: '60px', borderRadius: '0.25rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', cursor: 'pointer', backgroundColor: `${activeIndex === index ? 'var(--p-color-bg-fill-info-active)' : 'white'}`, color: `${activeIndex === index ? '#fff' : 'var(--p-color-bg-fill-inverse-active)'}` }}
                      onClick={() => handleItemClick(index)}
                    >
                      {/* <div className="grid-item-inner"></div> */}
                      <p style={{ textTransform: 'capitalize', textAlign: 'center', fontWeight: 'bold', fontSize: '10px' }}>{positionClasses[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
      <RangeSlider
        output
        label="Top"
        min={0}
        max={1000}
        value={topValue}
        onChange={handleTopSliderChange}
      />
      <RangeSlider
        output
        label="Bottom"
        min={0}
        max={1000}
        value={bottomValue}
        onChange={handleBottomSliderChange}
      />
      <RangeSlider
        output
        label="Left"
        min={0}
        max={1000}
        value={leftValue}
        onChange={handleLeftSliderChange}
      />
      <RangeSlider
        output
        label="Right"
        min={0}
        max={1000}
        value={rightValue}
        onChange={handleRightSliderChange}
      />
    <PageActions
    primaryAction={{
      content: "Save",
      onAction: handleSave,
    }}
  />
  </Page>
  );
}

export default TextFieldExample;