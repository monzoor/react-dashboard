import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

const ProgressSteps = (currentSteps) => {
    const { current, status } = currentSteps;
    return (
        <Steps size="small" current={current} status={status}>
            <Step title="Image" description="Upload at least 1 image." />
            <Step title="Title & desciption" description="This is a description." />
            <Step title="Price" description="This is a description." />
            <Step title="Stock & Variation" description="This is a description." />
            <Step title="Descrition" description="This is a description." />
        </Steps>
    );
};

export default ProgressSteps;
