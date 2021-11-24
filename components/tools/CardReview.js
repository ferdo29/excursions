import * as React from 'react';
import {BoxColumnView, BoxRow, Text12, Text18Bold} from "../../styles/components/tools";
import {IconStar, IconStarBoder} from "../Icons";
import moment from "moment";

export default function ({name, star, body, date}) {
    return (
        <BoxColumnView style={{alignItems: 'flex-start', marginTop: 20, borderBottomColor: '#E0E0E0', borderBottomWidth: 1, width: '100%'}}>
            <BoxRow style={{justifyContent: 'space-between'}}>
                <Text18Bold style={{color: '#4F4F4F'}}>{name}</Text18Bold>
                <BoxRow>
                    {[1, 2, 3, 4, 5].map(value => value <= star ? <IconStar key={value}/> : <IconStarBoder key={value}/>)}
                </BoxRow>

            </BoxRow>

            <Text12 style={{color:'#4F4F4F', marginBottom: 15, marginTop: 17}}>{body}</Text12>

            <Text12 style={{color:'#828282', marginBottom: 20}}>{moment().format(' DD MMMM YYYY')}</Text12>

        </BoxColumnView>
    );
};