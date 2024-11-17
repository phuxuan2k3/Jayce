import classNames from "classnames"

const GradientBorder = ({className, children} : {className? : string, children?: React.ReactNode}) => {
    return  <div className={classNames("bg-gradient-to-r to-[var(--secondary-color)] from-[var(--primary-color)]",className)}>
        {children}
    </div>
}

export default GradientBorder