import React from 'react'
import {Group ,Control, Label, Col} from 'react-bootstrap/Form'


const FileSender = () =>
{
    return(
        <section>
            <Group as={Col} controlId="formGridFileSender">
                <Label>Sender</Label>
                <Control as="select">
                    <option>All Files</option>
                    <option>Maha Elleci</option>
                    <option>Mohamed Wa'el</option>
                    <option>Marc Iskander</option>
                    <option>Ziad Ali</option>
                </Control>
            </Group>
        </section>
    )
}

export default FileSender;