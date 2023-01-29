import React from 'react';
import {
    View,
    Dimensions,
    ScrollView,
    Text,
    Platform,
    Image,
} from 'react-native';
import { Avatar } from '@rneui/themed';
//ACTIONS
import { getRequire } from '../../../main/functions';

//COMPONENTS
const ViewLiveStreaming = () => {
    return (
        <View
            style={{
                height: Dimensions.get('window').height + (Platform.OS === 'android' ? 50 : 0),
                width: Dimensions.get('window').width,
                backgroundColor: 'white',
                alignItems: 'center',
                paddingTop: 80,
                paddingLeft: 20,
                paddingRight: 20
            }}
        >
            <View
                style={{
                    width: Dimensions.get('window').width,
                    backgroundColor: '#068dc7',
                    alignItems: 'center',
                    padding: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 28,
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                >
                    {'Shorts & Live streaming'}
                </Text>
            </View>
            <Image
                style={{
                    width: Dimensions.get('window').width * 0.84,
                    height: Dimensions.get('window').width * 0.84 / 2,
                    marginTop: 20,
                    borderRadius: 10,
                }}
                source={getRequire('live_streaming_1')}
            />
            <Text
                style={{
                    fontSize: 16,
                    color: '#05375a',
                    marginTop: 10,
                    textAlign: 'justify',
                    fontWeight: 'bold',
                    paddingLeft: 10,
                    paddingRight: 10
                }}
            >
                {'Share video shorts and become a powerfull influencer in the community. Accept donations, payed calls and more...'}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 30,
                    width: Dimensions.get('window').width * 0.84,
                }}
            >
                <View
                    style={{
                        flex: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        style={{
                            width: Dimensions.get('window').width * 0.4,
                            height: Dimensions.get('window').width * 0.4 / 2,
                            borderRadius: 10,
                        }}
                        source={getRequire('live_streaming_2')}
                    />
                </View>
                <View
                    style={{
                        flex: 0.5,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginLeft: 10
                        }}
                    >
                        {'Create your own live streamings and accept monthly subcriptions.'}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    width: Dimensions.get('window').width * 0.84,
                }}
            >
                <View
                    style={{
                        flex: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        style={{
                            width: Dimensions.get('window').width * 0.4,
                            height: Dimensions.get('window').width * 0.4 / 2,
                            borderRadius: 10,
                        }}
                        source={getRequire('live_streaming_3')}
                    />
                </View>
                <View
                    style={{
                        flex: 0.5,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginLeft: 10
                        }}
                    >
                        {'Bring people from other social networks and increase your social impact.'}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const ViewMoneyCall = () => {
    return (
        <View
            style={{
                height: Dimensions.get('window').height + (Platform.OS === 'android' ? 50 : 0),
                width: Dimensions.get('window').width,
                backgroundColor: 'white',
                alignItems: 'center',
                paddingTop: 80,
                paddingLeft: 20,
                paddingRight: 20

            }}
        >
            <View
                style={{
                    width: Dimensions.get('window').width,
                    backgroundColor: '#068dc7',
                    alignItems: 'center',
                    padding: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 28,
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                >
                    {'Paid Calls & Free Chat'}
                </Text>
            </View>
            <Image
                style={{
                    width: Dimensions.get('window').width * 0.84,
                    height: Dimensions.get('window').width * 0.84 / 1.2,
                    marginTop: 20,
                    borderRadius: 10,
                }}
                source={getRequire('money_call_1')}
            />
            <Text
                style={{
                    fontSize: 16,
                    color: '#05375a',
                    marginTop: 10,
                    textAlign: 'justify',
                    fontWeight: 'bold',
                    paddingLeft: 10,
                    paddingRight: 10
                }}
            >
                {'Earn money by collecting from other users in audio/video paid calls.'}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    width: Dimensions.get('window').width * 0.84,
                }}
            >
                <View
                    style={{
                        flex: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginRight: 10
                        }}
                    >
                        {'Use the free chat to talk with your contacts and invite them.'}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0.5,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        style={{
                            width: Dimensions.get('window').width * 0.4,
                            height: Dimensions.get('window').width * 0.4 / 2,
                            borderRadius: 10,
                        }}
                        source={getRequire('money_call_2')}
                    />
                </View>
            </View>
        </View>
    )
}

const ViewPodcast = () => {
    return (
        <View
            style={{
                height: Dimensions.get('window').height + (Platform.OS === 'android' ? 50 : 0),
                width: Dimensions.get('window').width,
                backgroundColor: 'white',
                alignItems: 'center',
                paddingTop: 80,
                paddingLeft: 20,
                paddingRight: 20
            }}
        >
            <View
                style={{
                    width: Dimensions.get('window').width,
                    backgroundColor: '#068dc7',
                    alignItems: 'center',
                    padding: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 28,
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                >
                    {'Podcast & TV shows'}
                </Text>
            </View>
            <Image
                style={{
                    width: Dimensions.get('window').width * 0.84,
                    height: Dimensions.get('window').width * 0.84 / 2,
                    marginTop: 20,
                    borderRadius: 10,
                }}
                source={getRequire('podcast_1')}
            />
            <Text
                style={{
                    fontSize: 16,
                    color: '#05375a',
                    marginTop: 10,
                    textAlign: 'justify',
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontWeight: 'bold'
                }}
            >
                {'Create your own podcasts, add episodes and trailers and get other users paid subscriptions'}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 30,
                    width: Dimensions.get('window').width * 0.84,
                }}
            >
                <View
                    style={{
                        flex: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        style={{
                            width: Dimensions.get('window').width * 0.4,
                            height: Dimensions.get('window').width * 0.4,
                            borderRadius: 10,
                        }}
                        source={getRequire('podcast_2')}
                    />
                </View>
                <View
                    style={{
                        flex: 0.5,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#05375a',
                            textAlign: 'justify',
                            marginLeft: 10,
                            fontWeight: 'bold',
                        }}
                    >
                        {'Make your own series or shows and charge subscriptions. It is ideal for low cost producers.'}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const ViewFanContent = () => {
    return (
        <View
            style={{
                height: Dimensions.get('window').height + (Platform.OS === 'android' ? 50 : 0),
                width: Dimensions.get('window').width,
                backgroundColor: 'white',
                alignItems: 'center',
                paddingTop: 80,
                paddingLeft: 20,
                paddingRight: 20
            }}
        >
            <View
                style={{
                    width: Dimensions.get('window').width,
                    backgroundColor: '#068dc7',
                    alignItems: 'center',
                    padding: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 28,
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                >
                    {'Fan Content'}
                </Text>
            </View>
            <View
                style={{
                    width: Dimensions.get('window').width * 0.84,
                    marginTop: 20,
                    flexDirection: 'row',
                }}
            >
                <View
                    style={{
                        flex: 0.5,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        style={{
                            width: Dimensions.get('window').width * 0.42,
                            height: Dimensions.get('window').width * 0.42,
                            borderRadius: 10,
                        }}
                        source={getRequire('fan_content_1')}
                    />
                </View>
                <View
                    style={{
                        flex: 0.5,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginLeft: 10,
                        }}
                    >
                        {'You can see the most exclusive fan content and subscribe to it.'}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    width: Dimensions.get('window').width * 0.84,
                    marginTop: 30,
                    flexDirection: 'row',
                }}
            >
                <View
                    style={{
                        flex: 0.5,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginRight: 10
                        }}
                    >
                        {'Create your own fan content and attrack subscriptions monthly.'}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0.5,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        style={{
                            width: Dimensions.get('window').width * 0.42,
                            height: Dimensions.get('window').width * 0.42,
                            borderRadius: 10,
                        }}
                        source={getRequire('fan_content_3')}
                    />
                </View>
            </View>
            <View
                style={{
                    width: Dimensions.get('window').width * 0.84,
                    marginTop: 30,
                    flexDirection: 'row',
                }}
            >
                <View
                    style={{
                        flex: 0.5,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        style={{
                            width: Dimensions.get('window').width * 0.42,
                            height: Dimensions.get('window').width * 0.42 / 1.6,
                            borderRadius: 10,
                        }}
                        source={getRequire('fan_content_2')}
                    />
                </View>
                <View
                    style={{
                        flex: 0.5,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginLeft: 10
                        }}
                    >
                        {'Check your available profiles. You have 1 minute of FREE content on each one, up to 2 hours of FREE access.'}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const ViewWallet = () => {
    return (
        <View
            style={{
                height: Dimensions.get('window').height + (Platform.OS === 'android' ? 50 : 0),
                width: Dimensions.get('window').width,
                backgroundColor: 'white',
                alignItems: 'center',
                paddingTop: 80,
                paddingLeft: 20,
                paddingRight: 20
            }}
        >
            <View
                style={{
                    width: Dimensions.get('window').width,
                    backgroundColor: '#068dc7',
                    alignItems: 'center',
                    padding: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 28,
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                >
                    {'Wallet & KK Token'}
                </Text>
            </View>
            <View
                style={{
                    width: Dimensions.get('window').width * 0.84,
                }}
            >
                <View
                    style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        size='large'
                        rounded
                        source={getRequire('wallet_2')}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginLeft: 10,
                            width: Dimensions.get('window').width * 0.6
                        }}
                    >
                        {'Take control of your digital assets and pay for your needs.'}
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        size='large'
                        rounded
                        source={getRequire('wallet_1')}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginLeft: 10,
                            width: Dimensions.get('window').width * 0.6
                        }}
                    >
                        {'Request your debit cards and sync your payments.'}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <Avatar
                        size='large'
                        rounded
                        source={getRequire('kkt')}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginLeft: 10,
                            width: Dimensions.get('window').width * 0.6
                        }}
                    >
                        {'Get KKT token and obtain multiples advantages on trading and earning rewards.'}
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        size='large'
                        rounded
                        source={getRequire('wallet_4')}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginLeft: 10,
                            width: Dimensions.get('window').width * 0.6
                        }}
                    >
                        {'Create your trade orders in different markets.'}
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        size='large'
                        rounded
                        source={getRequire('wallet_3')}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginLeft: 10,
                            width: Dimensions.get('window').width * 0.6
                        }}
                    >
                        {'Buy, send and redeem gift cards of most popular platforms.'}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <Avatar
                        size='large'
                        rounded
                        source={getRequire('wallet_6')}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#05375a',
                            textAlign: 'justify',
                            fontWeight: 'bold',
                            marginLeft: 10,
                            width: Dimensions.get('window').width * 0.6
                        }}
                    >
                        {'Select the investment plan that satisfied your needs.'}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const Component = ({
    scrollViewRef,
    onScroll
}) => {

    //PRINCIPAL RENDER
    return (
        <>
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                persistentScrollbar={false}
                pagingEnabled={true}
                style={{
                    width: Dimensions.get('window').width,
                    alignSelf: 'center',
                }}
                scrollEventThrottle={16}
                onScroll={onScroll}
            >
                <ViewLiveStreaming />
                <ViewMoneyCall />
                <ViewFanContent />
                <ViewPodcast />
                <ViewWallet />
            </ScrollView>
        </>
    )
};

export default React.memo(Component);
