import SignUpFormComp from '@/app/components/auth/signup/SignUpFormComp';
import MainContainer from '@/app/components/common/MainContainer';
import SectionComp from '@/app/components/common/SectionComp';

export default function SignUp() {
  return (
    <MainContainer>
      <SectionComp direction="column" padding="0">
        <SignUpFormComp />
      </SectionComp>
    </MainContainer>
  );
}
