import * as React from 'react';
import Local from "../../../components/tools/Local";

export default function Language({navigation}) {
    return (
        <Local moveAction={() => navigation.goBack()}/>
    );
};