import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className={"pizza-block"}
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="139" cy="150" r="125" />
        <rect x="0" y="289" rx="10" ry="10" width="280" height="32" />
        <rect x="150" y="316" rx="0" ry="0" width="60" height="3" />
        <rect x="135" y="301" rx="0" ry="0" width="18" height="2" />
        <rect x="0" y="346" rx="10" ry="10" width="280" height="86" />
        <rect x="0" y="450" rx="10" ry="10" width="100" height="30" />
        <rect x="130" y="440" rx="10" ry="10" width="150" height="47" />
    </ContentLoader>
)

export default Skeleton

