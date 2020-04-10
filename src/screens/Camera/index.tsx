import React, { useEffect, useState } from 'react'
import { Camera } from 'expo-camera'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { Text } from '@components/common/styled';
import { useNavigation } from 'react-navigation-hooks'


const CameraTab = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const navigation = useNavigation()

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => setCamera(ref)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-between'
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'flex-end'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginTop: 30, color: 'red' }}> Flip </Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TouchableOpacity 
              style={{
                width: 75,
                height: 75,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 75/2,
                backgroundColor: 'transparent',
                borderWidth: 5,
                borderColor: 'white'
              }}
              onPress={async() => {
                const asset = await camera.takePictureAsync();
                const isSourceSelected = navigation.getParam('isSourceSelected')
                navigation.navigate('PhotoPreviewFromTarget', { asset, isSourceSelected })
              }}
            >
              <View 
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 60/2,
                  backgroundColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );

}

export default CameraTab
