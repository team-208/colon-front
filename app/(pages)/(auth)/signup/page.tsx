import SignUpFormComp from '@/app/components/auth/signup/SignUpFormComp';
import Section from '@/app/components/common/Section';

export default function SignUp() {
  return (
    <main>
      <Section direction="column" padding="0">
        <SignUpFormComp />
      </Section>
    </main>
  );
}
