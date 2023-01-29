import { useEffect, useState } from "react"
import { Platform } from "react-native";
import Contacts from "react-native-contacts";
import { check, RESULTS } from "react-native-permissions";
import { formatPhoneContacts, getPermission } from "../functions";
//STORES
import { store as authStore } from "../stores/auth"


export const getContacts = () => {

    //INITIAL CONSTANTS
    const { frequentUsers } = authStore.getState()

    //INITIAL STATES
    const [frequents, setFrequents] = useState([])
    const [phone, setPhone] = useState([])

    //EFFECTS
    useEffect(() => {
        let data = [];
        Object.entries(frequentUsers).forEach(([key, value]) => {
            delete value['username'];
            let name = value.nameUserFrequent.replace(/[^a-zA-Z ]/g, "");
            let firstLetter = name.charAt(0).toUpperCase();//replace characters special.
            let added = false;
            let val = { name: name, phones: [value.codCountry + '__' + value.phone] };
            /*Object.entries(initialData).every(function (element, index) {
              if (element[1].firstLetter === firstLetter) {
                element[1].values.push(val);
                added = true;
                return false;
              } else {
                return true;
              }
            })
            if (!added) {
              initialData.push({ key: key, firstLetter: firstLetter, values: [val] });
            }*/
            data.push(val);
            data = data.sort((a, b) => {
                if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
                if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
                return 0;
            });
            console.log('data', JSON.stringify(data, null, 4));
            setFrequents(data)
        })
    }, [])

    useEffect(async () => {
        if (false && await check(getPermission('READ_CONTACTS', Platform.OS)) === RESULTS.GRANTED) {
            let data = [];
            Contacts.getAll()
                .then((contacts) => {
                    Object.entries(contacts).forEach(([key, value]) => {
                        let name = value.displayName;
                        if (name !== undefined && name !== null && name !== 'undefined') {
                            if (Platform.OS === 'android') {
                                delete value['postalAddresses'];
                                delete value['thumbnailPath'];
                                delete value['hasThumbnail'];
                                delete value['note'];
                                delete value['company'];
                                delete value['familyName'];
                                delete value['middleName'];
                                delete value['rawContactId'];
                                delete value['emailAddresses'];
                                delete value['imAddresses'];
                                delete value['urlAddresses'];
                                delete value['department'];
                                delete value['jobTitle'];
                                delete value['suffix'];
                                delete value['prefix'];
                                delete value['givenName'];
                                delete value['recordID'];
                                name = name.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ ]/g, "").trim();
                            }
                            let phones = [];
                            let phoneSuffixes = [];
                            let newPhone = '';
                            let phoneSuffix = '';
                            Object.entries(value.phoneNumbers).forEach(([k, v]) => {
                                newPhone = formatPhoneContacts('58', v.number);
                                phoneSuffix = newPhone.split('__')[1].slice(newPhone.split('__')[1].length - 4, newPhone.split('__')[1].length)
                                if (phoneSuffixes.includes(phoneSuffix)) {
                                    return;
                                }
                                phoneSuffixes.push(phoneSuffix);
                                if (newPhone.split('__')[1] === '') {
                                    return;
                                }
                                if (newPhone.split('__')[0].length === 1 && !(newPhone.split('__')[0] === '1' || newPhone.split('__')[0] === '7')) {
                                    return;
                                }
                                if (newPhone.split('__')[0] === '549' || newPhone.split('__')[0] === '521') {
                                    return;
                                }
                                if ((newPhone.split('__')[0] === '52' || newPhone.split('__')[0] === '54') && newPhone.split('__')[1].length === 11) {
                                    newPhone = newPhone.split('__')[0] + '__' + newPhone.split('__')[1].slice(1, newPhone.length);
                                }
                                phones.push(newPhone);
                            })
                            if (phones.length === 0) {
                                return;
                            }
                            let val = { name: name, phones: phones };
                            data.push(val);
                            data = data.sort((a, b) => {
                                if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
                                if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
                                return 0;
                            });
                        }
                    })
                    /*contactsPersistedStore.dispatch(
                        { type: SET_CONTACTS_PHONE_DATA, payload: data }
                    )

                    contactsPersistedStore.dispatch(
                        { type: SET_CONTACTS_NUM_DATA_SHOW, payload: contacts.length }
                    )*/
                })
                .catch((e) => {
                    alert(e.toString())
                })

        } else {
            /* Alert.alert('Permissions Error', 'Error trying to get READ CONTACTS permission.', [
                 { text: 'Ok' }
             ]);*/
        }
    }, [])

    return {
        frequents: frequents,
        phone: phone
    }

}

