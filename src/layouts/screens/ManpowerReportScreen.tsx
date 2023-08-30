import React, { useState } from 'react';
import { FC } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, RefreshControl } from 'react-native';
import Colors from '../../style/Colors/colors';
import Appbar from '../../components/Appbar';
import { Dropdown } from 'react-native-element-dropdown';

interface Props { }
const ManpowerReportScreen: FC<Props> = (): JSX.Element => {
    const [value, setValue] = useState('');
    const [showTextBox, setShowTextBox] = useState(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const data = [
        { value: 'mac', label: 'MAC' },
        { value: 'sub_con', label: 'Sub Con' },
        { value: 'other', label: 'Other' },
    ];

    const handleDropdownChange = (value: any) => {
        // console.log("value",value)
        setValue(value.value);
        if (value.value === 'mac') {
            setShowTextBox(false);
        } else {
            setShowTextBox(true);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        // getdata();
        setRefreshing(false);
      };


    return (
        <>
            <Appbar title={'Daily Activity'} />
            <ScrollView style={styles.container}
             refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }>
                <Text style={styles.Manpower}>Manpower Reports</Text>

                <Text style={styles.date}>Worker Type +</Text>
                <View style={styles.card}>
                    {/* {renderLabel()} */}
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        value={value}
                        onChange={handleDropdownChange}
                    />
                </View>
                <Text style={styles.date}>Name</Text>
                <TextInput
                    style={styles.input}
                    // onChangeText={onChangeNumber}
                    // value={number}
                    placeholder=""
                />
                <Text style={styles.date}>Number of Worker</Text>
                <TextInput
                    style={styles.input}
                    // onChangeText={onChangeNumber}
                    // value={number}
                    placeholder=""
                />
                <View style={styles.align}>
                    <Text style={styles.date}>Name of Person</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""
                    />
                    <Text style={styles.date}>Start Time</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""
                    />
                    <Text style={styles.date}>End Time</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""
                    />
                </View>
                <View style={{ marginBottom: 40 }}>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screen_bg,
        padding: 24,
    },
    align: {
        backgroundColor: Colors.white,
        padding: 10,
        marginVertical: 20,

    },
    iconStyle: {
        width: 30,
        height: 30,
        color: '#000',
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black'
    },
    card: {
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.lightGray,
        marginBottom: 10
    },
    dropdown: {
        paddingHorizontal: 8,
    },
    input: {
        height: 45,
        marginVertical: 5,
        padding: 10,
        borderColor: Colors.lightGray,
        backgroundColor: Colors.lightGray,
        borderRadius: 2,
    },
    date: {
        fontFamily: 'Roboto-Medium',
        color: Colors.text_primary,
        fontSize: 16,
        marginTop: 15
    },
    Manpower: {
        fontFamily: 'Roboto-Medium',
        color: Colors.text_primary,
        fontSize: 18,

    }
});

export default ManpowerReportScreen;