import { Box, HStack, useRadio, useRadioGroup } from '@chakra-ui/react'
import React from 'react'
import { usePomodoro } from '../store/usePomodoro'

function RadioCard(props: any): JSX.Element {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={3}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export function CustomRadios() {
  const options = ['study', 'short break', 'long break']
  const setSelectedTypeRadio = usePomodoro((state: any) => state.setSelectedTypeRadio)

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'selectedTypeRadio',
    defaultValue: 'study',
    onChange: setSelectedTypeRadio,
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
