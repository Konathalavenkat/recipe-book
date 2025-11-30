import { Typography } from "@mui/material"
import { ALIGN_TYPES, ALIGN_MAP, AlignType } from "./Heading.constant";
import cx from "classnames";
import PropertyControlleComponent from "@/utils/PropertyControlledComponent/PropertyControlledComponent";


const Heading = ({ title, subTitle, align = ALIGN_TYPES.LEFT }: { title: string, subTitle?: string, align?: AlignType}) => {
    return (
        <div className={cx(ALIGN_MAP[align])}>
            <PropertyControlleComponent
                controller={!!title}
                renderer={() => <Typography variant="h4" sx={{ fontWeight: "bold" }}>{title}</Typography>}
            />
            <PropertyControlleComponent
                controller={!!subTitle}
                renderer={() => <Typography variant="h5">{subTitle}</Typography>}
            />
        </div>
    )
}

export default Heading;