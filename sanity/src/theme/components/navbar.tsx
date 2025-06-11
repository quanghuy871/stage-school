import {Stack, Card, Text} from '@sanity/ui'
import {NavbarProps, useWorkspace} from "sanity";

const Navbar = (props: NavbarProps) => {

    const {dataset} = useWorkspace()
    return (
        <Stack>
            <Card padding={3} tone="primary">
                <Text size={1}>
                    You are currently editing the <b>{dataset}</b> dataset.
                </Text>
            </Card>

            {props.renderDefault(props)}
        </Stack>
    )
}

export default Navbar