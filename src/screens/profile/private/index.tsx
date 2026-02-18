import { VStack } from "@/components/ui/vstack";
import { changeUserProperties } from "@/src/api/auth";
import { AuthContext } from "@/src/context/AuthProvider";
import { EmailFormData, emailFormSchema } from "@/src/schemas/signInForm";
import { UserNameFormData, userNameFormSchema } from "@/src/schemas/signUpForm";
import CardBox from "@/src/ui/CardBox";
import Container from "@/src/ui/Container";
import formatDate from "@/src/utils/formatDate";
import { Image } from "expo-image";
import { cssInterop } from "nativewind";
import { use } from "react";
import DisplayableUserProperty from "../shared/components/DisplayableUserProperty";
import ProfileHeader from "../shared/components/ProfileHeader";
import UserStatsCard from "../shared/components/UserStatsCard";
import EditableUserAvatar from "./components/EditableUserAvatar";
import EditableUserProperty from "./components/EditableUserProperty";
import SecurityCard from "./components/SecurityCard";

cssInterop(Image, { className: "style" });

export default function ProfileScreen() {
  const { user } = use(AuthContext).session!;

  return (
    <Container topAlignment>
      <VStack space="2xl" className="items-center w-full">
        <CardBox>
          <VStack space="3xl">
            <ProfileHeader>
              <EditableUserAvatar />
            </ProfileHeader>

            <VStack space="2xl">
              <EditableUserProperty<UserNameFormData>
                name="User name"
                value={user.user_metadata.name || "Unknown"}
                controlName="userName"
                schema={userNameFormSchema}
                mutationFn={({ userName }: UserNameFormData) =>
                  changeUserProperties({ userName })
                }
                placeholder="Type new user name"
                keyboardType="default"
                toastTitle="User name change"
                toastSuccessMessage="User name changed successfully"
              />

              <EditableUserProperty<EmailFormData>
                name="Email"
                value={user.email || "Unknown"}
                controlName="email"
                schema={emailFormSchema}
                mutationFn={({ email }: EmailFormData) =>
                  changeUserProperties({ email })
                }
                placeholder="Type new email"
                keyboardType="email-address"
                toastTitle="Email change"
                toastSuccessMessage="Confirm the new email"
              />

              <DisplayableUserProperty
                type="displayable"
                name="Created at"
                value={formatDate(user.created_at)}
              />
            </VStack>
          </VStack>
        </CardBox>

        <UserStatsCard isPublicProfile={false} />

        <SecurityCard />
      </VStack>
    </Container>
  );
}
