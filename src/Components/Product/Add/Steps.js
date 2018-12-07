import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

const ProgressSteps = (currentSteps) => {
    const { current } = currentSteps;
    return (
        <Steps size="small" current={current}>
            <Step title="Image" description="This is a description." />
            <Step title="Title & desciption" description="This is a description." />
            <Step title="Price" description="This is a description." />
            <Step title="Stock & Variation" description="This is a description." />
            <Step title="Descrition" description="This is a description." />
        </Steps>
    );
};

export default ProgressSteps;
