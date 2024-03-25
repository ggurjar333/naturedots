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
import {
  type ApiError,
  type ObservationOut,
  type ObservationUpdate,
  ObservationsService
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface EditObservationProps {
  observation: ObservationOut
  isOpen: boolean
  onClose: () => void
}

const EditObservation: React.FC<EditObservationProps> = ({ observation, isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<ObservationUpdate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: observation,
  })

  const updateObservation = async (data: ObservationUpdate) => {
    await ObservationsService.updateObservation({ id: observation.id, requestBody: data })
  }

  const mutation = useMutation(updateObservation, {
    onSuccess: () => {
      showToast("Success!", "Observation updated successfully.", "success")
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = err.body?.detail
      showToast("Something went wrong.", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries("observations")
    },
  })

  const onSubmit: SubmitHandler<ObservationUpdate> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    onClose()
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
          <ModalHeader>Edit Observation</ModalHeader>
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
            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isDirty}
            >
              Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditObservation
