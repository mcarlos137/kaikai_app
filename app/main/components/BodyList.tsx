import React from 'react';
import {
    View,
    RefreshControl,
    FlatList,
} from 'react-native';
import { useTheme } from 'react-native-paper';
//COMPONENTS
import ViewInstructions from './ViewInstructions'

type BodyList_Props = {
    data: any[]
    renderItem: any
    keyExtractor: any
    instructions: any[]
    refreshing: any
    onRefresh: any
}

const Component = ({ data, renderItem, keyExtractor, instructions, refreshing, onRefresh }: BodyList_Props) => {

    //HOOKS CALLS
    const { colors } = useTheme<any>()

    //PRINCIPAL RENDER
    return (
        <View style={{
            flex: 1
        }}>
            {
                data?.length === 0 && !refreshing
                    ?
                    <ViewInstructions
                        instructions={instructions}
                        type={'STEPS'}
                        marginTop={10}
                    />
                    :
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={13}
                        windowSize={13}
                        initialNumToRender={8}
                        persistentScrollbar={true}
                        //getItemLayout={getItemLayout}
                        style={{
                            marginBottom: 20,
                            alignSelf: 'center',
                            paddingLeft: 10,
                            paddingRight: 10,
                            minWidth: 100
                        }}
                        updateCellsBatchingPeriod={100}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor={colors.getRandomMain()}
                                colors={[colors.getRandomMain()]}
                            />
                        }
                    />
            }
        </View>
    )
};

export default React.memo(Component);