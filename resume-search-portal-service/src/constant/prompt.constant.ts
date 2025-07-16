import { IElasticConsumer } from "../interface/elasitc.interface";

const generatePromptForUser = (payload: IElasticConsumer) => {
  const prompt = `
You are an AI PhD advisor recommendation assistant.

Based on the following user profile data extracted from their resume, recommend the top 3 professors suitable to guide them for a PhD. The recommendation should include the professor's name, university/organization, research focus, and the reason why they would be a good match.

USER PROFILE:
- Summary: ${payload.summary}
- Experience: ${payload.experience}.
- Projects:
    ${payload.projects}
- Skills:
    ${payload.skills}
- Education: ${payload.education}
- Certifications: ${payload.certifications}
- Others: ${payload.others}

RECOMMENDATION FORMAT:
1. **Professor Name** (University)
   - **Research Area:** [e.g., Web Systems, Distributed Computing, Security]
   - **Why Recommended:** [Short reason based on user's background]
2. ...
`;
  return prompt;
};

export { generatePromptForUser };
