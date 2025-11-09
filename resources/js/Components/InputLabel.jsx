export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-medium text-gray-500 mb-1 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
