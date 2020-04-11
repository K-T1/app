import React, { useEffect, useState } from 'react'
import { Camera } from 'expo-camera'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { Text } from '@components/common/styled';
import { useNavigation } from 'react-navigation-hooks'
import { Entypo } from '@expo/vector-icons';

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

  const onTakePhoto = async () => {
    const asset = await camera.takePictureAsync();
    navigation.navigate('PhotoPreviewFromSource', { asset })
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
            <Entypo style={{ marginTop: 30, marginRight: 10 }} size={32} color="white" name="cycle" />
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
                borderRadius: 75 / 2,
                backgroundColor: 'transparent',
                borderWidth: 5,
                borderColor: 'white'
              }}
              onPress={onTakePhoto}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 60 / 2,
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
