import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import {secondary} from '../constantes'

export default ({img, title, price, discount, extraStyle}) => {
    const withDiscount = discount ? ((price * discount) / 100) : price
    
    return(
        <TouchableOpacity style={[styles.item, {...extraStyle}]}>
            {
                discount
                &&
                    <>
                        <View style={styles.discountContainer} />
                        <View style={styles.discount}>
                            <Text style={{fontSize: 8, fontWeight: 'bold', color: '#fff'}}>{`${discount}%`}</Text>
                        </View>
                    </>
            }
            <View style={styles.imageContainer}>
                <Image
                    source={{uri: img}}
                    style={{width: 50, height: 50}}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={{fontSize: 13, color: '#383838', fontWeight: 'bold', textAlign: 'center'}}>{title}</Text>
            </View>
            <View style={styles.pricesContainer}>
                <View style={styles.priceElement}>
                    <Text style={[styles.description, discount ? styles.line : undefined]}>{`$${price}`}</Text>
                </View>
                {
                    discount
                    &&
                        <View style={styles.priceElement}>
                            <Text style={styles.description}>{`$${price - withDiscount}`}</Text>
                        </View>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 8,
        borderWidth: 2,
        borderColor: '#f1f1f1',
        overflow: 'hidden',
    },
    discountContainer: {
        height: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondary,
        position: 'absolute',
        top: -25,
        right: -60,
        zIndex: 10,
        transform: [
            {rotate: '45deg'}
        ]
    },
    discount: {
        position: 'absolute',
        top: 13,
        right: 7,
        zIndex: 10
    },
    imageContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 6
    },
    descriptionContainer: {
        height: 'auto', 
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12
    },
    pricesContainer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
    },
    priceElement: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    description: {
        fontSize: 13,
        color: '#383838',
        fontWeight: '300'
    },
    line: {
        textDecorationColor: '#383838',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    }
})