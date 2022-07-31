import { Button, SimpleGrid, type ButtonProps } from "@mantine/core";

import DiscordIcon from "./icons/discord";
import FacebookIcon from "./icons/facebook";
import GoogleIcon from "./icons/google";
import TwitterIcon from "./icons/twitter";

export function GoogleButton(props: ButtonProps<"button">) {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  );
}

export function FacebookButton(props: ButtonProps<"button">) {
  return (
    <Button
      leftIcon={<FacebookIcon />}
      sx={(theme) => ({
        backgroundColor: "#4267B2",
        color: "#fff",
        "&:hover": {
          backgroundColor: theme.fn.darken("#4267B2", 0.1),
        },
      })}
      {...props}
    />
  );
}

export function DiscordButton(props: ButtonProps<"button">) {
  return (
    <Button
      leftIcon={<DiscordIcon />}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? "#5865F2" : "#7289da",
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.fn.lighten("#5865F2", 0.05)
              : theme.fn.darken("#7289da", 0.05),
        },
      })}
      {...props}
    />
  );
}

// Twitter button as anchor
export function TwitterButton(props: ButtonProps<"button">) {
  return (
    <Button
      component="button"
      leftIcon={<TwitterIcon />}
      variant="default"
      {...props}
    />
  );
}

// export function GithubButton(props: ButtonProps<"button">) {
//   return (
//     <Button
//       {...props}
//       leftIcon={<MarkGithubIcon />}
//       sx={(theme) => ({
//         backgroundColor:
//           theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
//         color: "#fff",
//         "&:hover": {
//           backgroundColor:
//             theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
//         },
//       })}
//     />
//   );
// }

export default function SocialButton() {
  return (
    <SimpleGrid cols={2}>
      <GoogleButton radius="xl" type="submit" name="provider" value="google">
        Google
      </GoogleButton>
      <TwitterButton radius="xl" type="submit" name="provider" value="twitter">
        Twitter
      </TwitterButton>
      <FacebookButton
        radius="xl"
        type="submit"
        name="provider"
        value="facebook"
      >
        Facebook
      </FacebookButton>
      <DiscordButton radius="xl" type="submit" name="provider" value="discord">
        Discord
      </DiscordButton>
    </SimpleGrid>
  );
}
