import { Card, CardBody, CardHeader, Checkbox, Grid, HStack, Image, Text, Heading, Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch("/db.json")
      .then(res => res.json())
      .then(result => setData(result))
  }, [])

  const handleActive = (id) => {
    const customItem = data.plants.filter(i => i.id === id)[0]
    customItem.active = !customItem.active

    const edited = data.plants.map(item => {

      if (customItem.id == item.id) {
        return customItem
      } else {
        return item
      }
    })
    setData({ plants: edited })
  }

  return (
    <>
      <Heading textAlign={"center"}>
        Flower app React
      </Heading>
      <Flex justify={"center"}>
        <Grid p={"10px"} gap={"10px"} templateColumns={["repeat(3, 1fr)", "repeat(4, 1fr)", "repeat(8, 1fr)"]}>
          {data.plants && data.plants.map((plant) => {
            return <Card key={plant.id}>
              <CardHeader m={0} p={0}>
                <Image style={{ filter: plant.active ? "" : "grayscale(100%)" }} src={`${plant.pic}`} />
              </CardHeader>
              <CardBody p={1}>
                <Text>{plant.title}</Text>
                <HStack justify={"left"}>
                  <Text>Active:</Text>
                  <Checkbox isChecked={plant.active} onChange={() => handleActive(plant.id)} />
                </HStack>
              </CardBody>
            </Card>
          })}
        </Grid>
      </Flex>
    </>
  )
}

export default App
