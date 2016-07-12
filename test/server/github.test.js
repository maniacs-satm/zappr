import sinon from 'sinon'
import { expect } from 'chai'
import { GithubService } from '../../server/service/GithubService'

describe('The Github service', () => {
  let github
  const MOCK_COMMENTS = [
    {created_at: '2016-07-11T15:00:00Z'},
    {created_at: '2016-07-11T17:00:00Z'}
  ]

  beforeEach(() => {
    github = new GithubService()
    github.fetchPath = sinon.spy()
  })

  describe('#getComments', () => {
    it('should include only comments created after `since`', async(done) => {
      try {
        github.fetchPath = sinon.stub().returns(MOCK_COMMENTS)
        const comments = await github.getComments('zalando', 'zappr', 348, '2016-07-11T16:00:00Z', 'token')
        expect(comments.length).to.equal(1)
        expect(comments[0]).to.equal(MOCK_COMMENTS[1])
        done()
      } catch (e) {
        done(e)
      }
    })

    it('should not include comments created before `since` ', async(done) => {
      try {
        github.fetchPath = sinon.stub().returns(MOCK_COMMENTS)
        const comments = await github.getComments('zalando', 'zappr', 348, '2016-07-15T12:00:00Z', 'token')
        expect(comments.length).to.equal(0)
        done()
      } catch (e) {
        done(e)
      }
    })

    it('should include everything if since is not present', async(done) => {
      try {
        github.fetchPath = sinon.stub().returns(MOCK_COMMENTS)
        const comments = await github.getComments('zalando', 'zappr', 348, null, 'token')
        expect(comments).to.equal(MOCK_COMMENTS)
        done()
      } catch (e) {
        done(e)
      }
    })
  })
})