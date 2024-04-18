import SignUpFormComp from '@/app/components/auth/signup/SignUpFormComp';
import SectionComp from '@/app/components/common/SectionComp';

export default function SignUp() {
  return (
    <main>
      <SectionComp direction="column">
        <SignUpFormComp />
      </SectionComp>
    </main>
  );
}
