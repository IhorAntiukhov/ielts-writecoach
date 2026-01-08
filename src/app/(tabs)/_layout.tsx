import TabBar from "@/src/components/tabBar";
import Tab from "@/src/components/tabBar/Tab";
import Container from "@/src/ui/Container";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";

export default function TabLayout() {
  return (
    <Tabs>
      <Container>
        <TabSlot />
      </Container>

      <TabList asChild>
        <TabBar>
          <TabTrigger name="index" href="/(tabs)" asChild>
            <Tab title="Community" icon="Handshake" />
          </TabTrigger>

          <TabTrigger name="private" href="/(tabs)/private" asChild>
            <Tab title="Your essays" icon="Rows3" />
          </TabTrigger>

          <TabTrigger name="analytics" href="/(tabs)/analytics" asChild>
            <Tab title="Analytics" icon="ChartColumn" />
          </TabTrigger>

          <TabTrigger name="profile" href="/(tabs)/profile" asChild>
            <Tab title="Profile" icon="CircleUser" />
          </TabTrigger>
        </TabBar>
      </TabList>
    </Tabs>
  );
}
