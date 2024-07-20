import '../styles/styles.css'

import { Page, InlineStack, Text, Icon, Card, Button, Checkbox, BlockStack, Banner, RangeSlider, ButtonGroup, PageActions} from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { createOrUpdateBanner } from "../app.server"
import { authenticate } from "../shopify.server";
import {
  useSubmit,
} from "@remix-run/react";


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

  const submit = useSubmit();
  function handleSave() {
    const data = {
      "topValue": topValue,
      "leftValue": leftValue,
      "displayPosition": positionClasses[activeIndex],
    };
    submit(data, { method: "post" });
  }

  const [topValue, setTopValue] = useState(0);
  const [leftValue, setLeftValue] = useState(0);

  const handleTopSliderChange = useCallback((value) => {
    setTopValue(value);
  }, []);

  const handleLeftSliderChange = useCallback((value) => {
    setLeftValue(value);
  }, []);

  // use default active index
  const [activeIndex, setActiveIndex] = useState(0);

  // function to handle position grid
  const handleItemClick = (index) => {
    setActiveIndex(index); // Set the clicked item as active'
  };

  const positionClasses = [
    'top-left', 'top-right',
    'bottom-left', 'bottom-right'
  ];

  const [enableHover, setEnableHover] = useState(false);
  function handleHover() { setEnableHover(!enableHover) }

  return (
    <Page>
           <div className='grid' style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '10px' }}>
        <div className='product-view-card'>
          </div>
        </div>
        <Card>
        <InlineStack gap={400} blockAlign='center'>
                <p style={{ fontWeight: "bold" }}>Sticky add to cart</p>
                <label className="hoverSwitchContainer" style={{ cursor: 'pointer' }}>
                  <input type="checkbox" checked={enableHover} onChange={handleHover} />
                  <span className="slider"></span>
                </label>
              </InlineStack>
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
      </Card>
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
        label="Left"
        min={0}
        max={1000}
        value={leftValue}
        onChange={handleLeftSliderChange}
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