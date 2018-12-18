const ErrorThrower = (props) => {
    const { errorInfos, errorMessage } = props;
    const { hasErrors, componentError } = errorInfos;

    if (hasErrors && !componentError) {
        throw new Error(errorMessage);
    }
    return null;
};


export default ErrorThrower;
