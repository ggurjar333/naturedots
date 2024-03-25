import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import type React from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import { type ApiError, type ObservationCreate, ObservationsService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface AddObservationProps {
  isOpen: boolean
  onClose: () => void
}

const AddObservation: React.FC<AddObservationProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ObservationCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      location: "",
      description: "",
      latitude: 0,
      longitude: 0,
      date_time: "",
      pH: 0,
      conductivity: 0,
      DO:0,
      contaminants: ""
    },
  })

  const AddObservation = async (data: ObservationCreate) => {
    await ObservationsService.createObservation({ requestBody: data })
  }

  const mutation = useMutation(AddObservation, {
    onSuccess: () => {
      showToast("Success!", "Observation created successfully.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = err.body?.detail
      showToast("Something went wrong.", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries("items")
    },
  })

  const onSubmit: SubmitHandler<ObservationCreate> = (data) => {
    mutation.mutate(data)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Observation</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.location}>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Input
              id="location"
              {...register("location", {
                required: "Location is required.",
              })}
              placeholder="Location"
              type="text"
            />
            {errors.location && (
              <FormErrorMessage>{errors.location.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="latitude">Latitude</FormLabel>
            <Input
              id="latitude"
              {...register("latitude", {
                required: "Latitude is required.",
              })}
              placeholder="Latitude"
              type="number"
            />
            {errors.latitude && (
              <FormErrorMessage>{errors.latitude.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="longitude">Longitude</FormLabel>
            <Input
              id="longitude"
              {...register("longitude", {
                required: "Longitude is required.",
              })}
              placeholder="Longitude"
              type="number"
            />
            {errors.longitude && (
              <FormErrorMessage>{errors.longitude.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="date_time">Date and Time</FormLabel>
            <Input
              id="date_time"
              {...register("date_time", {
                required: "Date and time is required.",
              })}
              placeholder="Date and Time"
              type="datetime-local"
            />
            {errors.date_time && (
              <FormErrorMessage>{errors.date_time.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="pH">pH</FormLabel>
            <Input
              id="pH"
              {...register("pH", {
                required: "pH is required.",
              })}
              placeholder="pH"
              type="number"
            />
            {errors.pH && (
              <FormErrorMessage>{errors.pH.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="conductivity">Conductivity</FormLabel>
            <Input
              id="conductivity"
              {...register("conductivity", {
                required: "Conductivity is required.",
              })}
              placeholder="Conductivity"
              type="number"
            />
            {errors.conductivity && (
              <FormErrorMessage>{errors.conductivity.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="DO">Dissolved Oxygen</FormLabel>
            <Input
              id="DO"
              {...register("DO", {
                required: "Dissolved oxygen is required.",
              })}
              placeholder="Dissolved Oxygen"
              type="number"
            />
            {errors.DO && (
              <FormErrorMessage>{errors.DO.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="contaminants">Contaminants</FormLabel>
            <Input
              id="contaminants"
              {...register("contaminants", {
                required: "Contaminants are required.",
              })}
              placeholder="Contaminants"
              type="text"
            />
            {errors.contaminants && (
              <FormErrorMessage>{errors.contaminants.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                id="description"
                {...register("description")}
                placeholder="Description"
                type="text"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddObservation
