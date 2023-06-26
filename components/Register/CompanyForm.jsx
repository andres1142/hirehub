import { useState } from "react";
import {View, Text, TextInput} from "react-native";

function CompanyForm() {
    return (
        <View>
            <View>
                <Text>Email:</Text>
                <Text>Password:</Text>
                <Text>Confirm Password:</Text>

                <Text>Company Name:</Text>
                <Text>Company Description:</Text>
                <Text>Zip Code:</Text>
                <Text>Logo:</Text>
            </View>
        </View>
    )
}

export { CompanyForm }
