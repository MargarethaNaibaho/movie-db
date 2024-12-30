import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text className="text-4xl text-red-500 justify-center">Hi</Text>
    </SafeAreaView>
  )
}