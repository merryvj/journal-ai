import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Home from '../app/page'

vi.mock('@clerk/nextjs', () => {
    return {
        auth: () => new Promise((resolve) => resolve({userId: 'sdfsdfsdf'})),
        ClerkProvider: ({children}) => <div>{children}</div>,
        useUser: () => ({
            isSignedIn: true,
            user: {
                id: 'skdjfldsjf',
                fullName: 'Ronnie Roo'
            }
        })
    }
})

test('Home', async() => {
    render(await Home()),
    expect(screen.getByText('A really good journal')).toBeTruthy()
})